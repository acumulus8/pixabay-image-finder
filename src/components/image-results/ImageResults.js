import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: "",
    imgUser: ""
  };

  handleOpen = (img, imgUser) => {
    this.setState({ open: true, currentImg: img, imgUser: imgUser });
    console.log("click event works");
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const images = this.props.images;

    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img => (
            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton
                  onClick={() => this.handleOpen(img.largeImageURL, img.user)}
                >
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="close" primary={true} onClick={this.handleClose} />
    ];

    const description = (
      <span>
        Image by <strong>{this.state.imgUser}</strong>
      </span>
    );

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} style={{ width: "100%" }} />
          <br/>
          {description}
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
