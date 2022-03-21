import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import { Photos } from "./Photos";

export default class Explore extends Component {
    render() {
        return (<Gallery photos={Photos} />);
    }
}