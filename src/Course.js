import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";

import "./App.css";
import Section from "./Section";

function getIncludeIn(arr1, arr2) {
  let temp = [];
  for (const item of arr2) {
    if (arr1.includes(item)) {
      temp.push(item);
    }
  }
  //   全部上完了
  return temp.length == arr2.length ? true : false;
}

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showModal: false,

      comList: [],
      isAllReq: true,
    };
  }

  componentDidMount() {
    this.props.car && this.getComsed();
  }

  getComsed = () => {
    // let courseURL = "http://cs571.cs.wisc.edu:53706/api/react/classes";
    // let courseFinishData = await (await fetch(courseURL)).json();

    let courseFinishData = [
      "PSYCH 202",
      "COMP SCI 200",
      "COMP SCI 300",
      "CHEM 103",
      "MATH 114",
      "MATH 221",
    ];
    var alldata = this.props.data;

    var isAllReq = getIncludeIn(courseFinishData, alldata.requisitesArrs);

    this.setState({ comList: courseFinishData, isAllReq });
  };

  render() {
    return (
      <Card
        style={{
          width: "33%",
          marginTop: "5px",
          marginBottom: "5px",
          border: this.props.car && !this.state.isAllReq ? "1px solid red" : "",
        }}
      >
        <Card.Body>
          <Card.Title>
            <div style={{ maxWidth: 250 }}>{this.props.data.name}</div>
            {this.getExpansionButton()}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.data.number} - {this.getCredits()}
          </Card.Subtitle>
          {this.getDescription()}
          <Button variant="dark" onClick={() => this.openModal()}>
            View sections
          </Button>

          {/* {this.props.car && !this.state.isAllReq && ( */}
          <p>
            PATH:
            {this.props.data.requisitesArrs.length
              ? this.props.data.requisitesArrs.map((it, index) => (
                  <span key={index}>
                    {index == 0 ? "" : "->"} {it}
                  </span>
                ))
              : "None"}
          </p>
          {/* )} */}

          {this.props.car && !this.state.isAllReq && (
            <Button
              variant="dark"
              onClick={() => {
                this.props.addRecommended(this.props.data);
              }}
            >
              bookmark
            </Button>
          )}
        </Card.Body>

        <Modal
          show={this.state.showModal}
          onHide={() => this.closeModal()}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.data.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.getSections()}</Modal.Body>
          <Modal.Footer>
            {this.getCourseButton()}
            <Button variant="secondary" onClick={() => this.closeModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    );
  }

  getCourseButton() {
    let buttonVariant = "dark";
    let buttonOnClick = () => this.addCourse();
    let buttonText = "Add Course";

    if (this.props.courseKey in this.props.cartCourses) {
      buttonVariant = "outline-dark";
      buttonOnClick = () => this.removeCourse();
      buttonText = "Remove Course";
    }

    return (
      <Button variant={buttonVariant} onClick={buttonOnClick}>
        {buttonText}
      </Button>
    );
  }

  getSections() {
    let sections = [];

    for (let i = 0; i < this.props.data.sections.length; i++) {
      sections.push(
        <Section
          key={this.props.data.number + i}
          data={this.props.data.sections[i]}
          addCartCourse={this.props.addCartCourse}
          removeCartCourse={this.props.removeCartCourse}
          cartCourses={this.props.cartCourses}
          courseKey={this.props.courseKey}
          sectionKey={i}
        />
      );
    }

    return <Accordion defaultActiveKey="0">{sections}</Accordion>;
  }

  addCourse() {
    this.props.addCartCourse({
      course: this.props.courseKey,
    });
  }

  removeCourse() {
    this.props.removeCartCourse({
      course: this.props.courseKey,
    });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  setExpanded(value) {
    this.setState({ expanded: value });
  }

  getExpansionButton() {
    let buttonText = "▼";
    let buttonOnClick = () => this.setExpanded(true);

    if (this.state.expanded) {
      buttonText = "▲";
      buttonOnClick = () => this.setExpanded(false);
    }

    return (
      <Button
        variant="outline-dark"
        style={{
          width: 25,
          height: 25,
          fontSize: 12,
          padding: 0,
          position: "absolute",
          right: 20,
          top: 20,
        }}
        onClick={buttonOnClick}
      >
        {buttonText}
      </Button>
    );
  }

  getDescription() {
    if (this.state.expanded) {
      return <div>{this.props.data.description}</div>;
    }
  }

  getCredits() {
    if (this.props.data.credits === 1) return "1 credit";
    else return this.props.data.credits + " credits";
  }
}

export default Course;
