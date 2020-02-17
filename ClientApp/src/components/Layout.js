import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './Navbar/NavMenu';
import { Footer } from './Footer/Footer';

export class Layout extends Component {
  displayName = Layout.name
    
    render() {
        window.scrollTo(0, 0);
    return (
      <Grid fluid>
        <Row>
          <Col sm={12} className="section-wrapper">
            <NavMenu />
          </Col>
          <Col sm={12} className="section-wrapper">
            {this.props.children}
          </Col>
          <Footer />
        </Row>
      </Grid>
    );
  }
}
