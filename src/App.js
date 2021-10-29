import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import Completed from "./Completed";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { data } from "./data/data";

const dataHandle = (params) => {
  return params.map((it, index) => ({
    ...it,
    requisitesArrs: it.requisites.flat(5),
  }));
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: [],
      filteredCourses: [],
      subjects: [],
      cartCourses: {},
      allKeys: [],

      completeList: [],
      completedArr: [],
      recommends: [],

      activeKey: "search",
    };
  }

  componentDidMount() {
    this.loadInitialState();
  }

  async loadInitialState() {
    //   全部的数据
    // let courseURL = "http://cs571.cs.wisc.edu:53706/api/react/classes";
    // let courseAllData = await (await fetch(courseURL)).json();

    //   已经完成的数据
    // let courseURL = "http://cs571.cs.wisc.edu:53706/api/react/classes";
    // let courseAllData = await (await fetch(courseURL)).json();

    let courseData = dataHandle(data);
    console.log("courseData -> :", courseData);

    var allKeyArr = data.map((it, index) => [...it.keywords]).flat(5);
    var allKeys = [...new Set(allKeyArr)];
    var recommends = [];

    let completedArr = [
      "PSYCH 202",
      "COMP SCI 200",
      "COMP SCI 300",
      "CHEM 103",
      "MATH 114",
      "MATH 221",
    ];

    var completeData = courseData
      .map((value) => {
        if (completedArr.includes(value.number)) {
          return value;
        }
        return null;
      })
      .filter((value) => value);

    this.setState({
      allCourses: courseData,
      recommends: recommends,
      filteredCourses: courseData,
      subjects: this.getSubjects(courseData),

      completeList: completeData,
      completedArr,
      allKeys,
    });
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (let i = 0; i < data.length; i++) {
      if (subjects.indexOf(data[i].subject) === -1)
        subjects.push(data[i].subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  addCartCourse(data) {
    let newCartCourses = JSON.parse(JSON.stringify(this.state.cartCourses)); // I think this is a hack to deepcopy
    let courseIndex = this.state.allCourses.findIndex((x) => {
      return x.number === data.course;
    });
    if (courseIndex === -1) {
      return;
    }

    if ("subsection" in data) {
      if (data.course in this.state.cartCourses) {
        if (data.section in this.state.cartCourses[data.course]) {
          newCartCourses[data.course][data.section].push(data.subsection);
        } else {
          newCartCourses[data.course][data.section] = [];
          newCartCourses[data.course][data.section].push(data.subsection);
        }
      } else {
        newCartCourses[data.course] = {};
        newCartCourses[data.course][data.section] = [];
        newCartCourses[data.course][data.section].push(data.subsection);
      }
    } else if ("section" in data) {
      if (data.course in this.state.cartCourses) {
        newCartCourses[data.course][data.section] = [];

        for (
          let i = 0;
          i <
          this.state.allCourses[courseIndex].sections[data.section].subsections
            .length;
          i++
        ) {
          newCartCourses[data.course][data.section].push(
            this.state.allCourses[courseIndex].sections[data.section]
              .subsections[i]
          );
        }
      } else {
        newCartCourses[data.course] = {};
        newCartCourses[data.course][data.section] = [];
        for (
          let i = 0;
          i <
          this.state.allCourses[courseIndex].sections[data.section].subsections
            .length;
          i++
        ) {
          newCartCourses[data.course][data.section].push(
            this.state.allCourses[courseIndex].sections[data.section]
              .subsections[i]
          );
        }
      }
    } else {
      newCartCourses[data.course] = {};

      for (
        let i = 0;
        i < this.state.allCourses[courseIndex].sections.length;
        i++
      ) {
        newCartCourses[data.course][i] = [];

        for (
          let c = 0;
          c < this.state.allCourses[courseIndex].sections[i].subsections.length;
          c++
        ) {
          newCartCourses[data.course][i].push(
            this.state.allCourses[courseIndex].sections[i].subsections[c]
          );
        }
      }
    }
    this.setState({ cartCourses: newCartCourses });
  }

  removeCartCourse(data) {
    let newCartCourses = JSON.parse(JSON.stringify(this.state.cartCourses));

    if ("subsection" in data) {
      newCartCourses[data.course][data.section].forEach((_subsection) => {
        if (_subsection.number === data.subsection.number) {
          newCartCourses[data.course][data.section].splice(
            newCartCourses[data.course][data.section].indexOf(_subsection),
            1
          );
        }
      });
      if (newCartCourses[data.course][data.section].length === 0) {
        delete newCartCourses[data.course][data.section];
      }
      if (Object.keys(newCartCourses[data.course]).length === 0) {
        delete newCartCourses[data.course];
      }
    } else if ("section" in data) {
      delete newCartCourses[data.course][data.section];
      if (Object.keys(newCartCourses[data.course]).length === 0) {
        delete newCartCourses[data.course];
      }
    } else {
      delete newCartCourses[data.course];
    }
    this.setState({ cartCourses: newCartCourses });
  }

  getCartData() {
    let cartData = [];

    for (const courseKey of Object.keys(this.state.cartCourses)) {
      let course = this.state.allCourses.find((x) => {
        return x.number === courseKey;
      });

      cartData.push(course);
    }
    return cartData;
  }

  addRecommended(row) {
    const { recommends } = this.state;
    if (!recommends.find((it) => it.number == row.number)) {
      var oldata = [row, ...recommends];
      this.setState({ recommends: oldata });
    }
  }

  addRecommendedArrs(row) {
    console.log("row -> :", row);
    var matchKey = row.keywords;
    const { recommends, allCourses, completedArr } = this.state;

    var haskeys = [];

    allCourses.forEach((currentItem) => {
      currentItem.keywords.forEach((k) => {
        if (matchKey.includes(k)) {
          haskeys.push(currentItem);
        }
      });
    });

    console.log("haskeys -> :", haskeys);

    let hash = {};
    var filthaskeys = haskeys.reduce((prev, cur, index, arr) => {
      // eslint-disable-next-line no-unused-expressions
      hash[cur.number] ? "" : (hash[cur.number] = true && prev.push(cur));
      return prev;
    }, []);
    console.log("filthaskeys -> :", filthaskeys);

    var nohascom = filthaskeys.filter(
      (value) => !completedArr.includes(value.number)
    );
    console.log("nohascom -> :", nohascom);

    var recommendsName = recommends.map((it, index) => it.number);

    var notHasrecoms = [];

    nohascom.forEach((currentItem) => {
      if (!recommendsName.includes(currentItem.number)) {
        notHasrecoms.push(currentItem);
      }
    });

    var oldata = [...notHasrecoms, ...recommends];
    this.setState({ recommends: oldata });
  }

  render() {
    return (
      <>
        <Tabs
          activeKey={this.state.activeKey}
          onSelect={(activeKey) => {
            this.setState({ activeKey });
          }}
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <Tab eventKey="search" title="Search" style={{ paddingTop: "50px" }}>
            <>
              <Sidebar
                setCourses={(courses) => this.setCourses(courses)}
                courses={this.state.allCourses}
                subjects={this.state.subjects}
                allKeys={this.state.allKeys}
              />
              <div style={{ marginLeft: "20vw" }}>
                <CourseArea
                  data={this.state.filteredCourses}
                  cartMode={false}
                  addCartCourse={(data) => this.addCartCourse(data)}
                  removeCartCourse={(data) => this.removeCartCourse(data)}
                  cartCourses={this.state.cartCourses}
                />
              </div>
            </>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{ paddingTop: "50px" }}>
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.getCartData()}
                cartMode={true}
                addCartCourse={(data) => this.addCartCourse(data)}
                removeCartCourse={(data) => this.removeCartCourse(data)}
                cartCourses={this.state.cartCourses}
                addRecommended={(row) => this.addRecommended(row)}
              />
            </div>
          </Tab>

          <Tab
            eventKey="complete"
            title="Completed Courses"
            style={{ paddingTop: "50px" }}
          >
            <Completed
              data={this.state.completeList}
              addRecommended={(data) => this.addRecommendedArrs(data)}
            />
          </Tab>

          <Tab
            eventKey="recommend"
            title="Recommended Courses"
            style={{ paddingTop: "50px" }}
          >
            <CourseArea
              data={this.state.recommends}
              cartMode={false}
              addCartCourse={(data) => this.addCartCourse(data)}
              removeCartCourse={(data) => this.removeCartCourse(data)}
              cartCourses={this.state.cartCourses}
            />
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;
