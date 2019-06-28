import React from "react";

export default class extends React.Component {
    render() {
        const { isoDate } = this.props

        const date = new Date(isoDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return ( month + '/' + day );
    }
}