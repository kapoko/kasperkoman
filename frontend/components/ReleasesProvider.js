import React, { Component } from 'react'
import gql from "graphql-tag"
import { graphql } from "react-apollo"

const query = gql`{
    releases (
        sort: "releaseDate:desc"
    ) {
        _id,
        title,
        subtitle,
        releaseDate,
        label,
        links,
        cover {
            square
        }
    }
}`

const ReleasesContext = React.createContext();

class ReleasesProvider extends Component {

    state = {
        activeRelease: null
    }

    setActiveRelease = index => {
        this.setState({
            activeRelease: index
        })
    }

    render() {
        const { data: { loading, error, releases }, req } = this.props;

        return (
            <ReleasesContext.Provider 
                value={{ 
                    releases: releases, 
                    activeRelease: this.state.activeRelease,
                    setActiveRelease: this.setActiveRelease 
                }}
            >
                {this.props.children}
            </ReleasesContext.Provider>
        )
    }
}

const ReleasesConsumer = ReleasesContext.Consumer

export default graphql(query, {
    props: ({ data }) => ({
        data
    })
})(ReleasesProvider);

export { ReleasesConsumer }

