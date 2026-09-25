import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { join, normalize } from 'node:path';

const root = join(process.cwd(), 'dist');
let building = false;

function build() {
  if (building) return;
  building = true;
  const child = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
  child.on('exit', () => { building = false; });
}

function scheduleDailyBuild() {
  const now = new Date();
  const next = new Date(now);
  next.setUTCHours(24, 0, 0, 0);
  setTimeout(() => {
    build();
    scheduleDailyBuild();
  }, next - now);
}

createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/build') {
    if (request.headers['x-build-secret'] !== process.env.BUILD_WEBHOOK_SECRET) {
      response.writeHead(401).end('Unauthorized');
      return;
    }
    build();
    response.writeHead(202).end('Build started');
    return;
  }

  const pathname = decodeURIComponent(request.url.split('?')[0]);
  const relativePath = pathname === '/'
    ? 'index.html'
    : `${pathname.replace(/^\/+/, '')}${pathname.endsWith('/') ? 'index.html' : ''}`;
  const candidate = normalize(join(root, relativePath));
  const found = candidate.startsWith(root) && existsSync(candidate) && statSync(candidate).isFile();
  const file = found ? candidate : join(root, '404.html');
  if (!existsSync(file)) {
    response.writeHead(503).end('Initial site build in progress');
    return;
  }
  response.writeHead(found ? 200 : 404);
  createReadStream(file).pipe(response);
}).listen(4321, () => {
  build();
  scheduleDailyBuild();
});
