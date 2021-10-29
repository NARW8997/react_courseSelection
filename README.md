[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=6025951&assignment_repo_type=AssignmentRepo)
# Homework: React 2 α (6 Points Total)

This assignment is meant to introduce you to more features of React. This is the second α, feature based, assignment in which you will extend the features of a course guide application. This application uses a limited quantity of modified data from the UW-Madison course information database. With this assignment, you will extend the features of React 1 α to create a course recommendation system.

You may either use your code from React 1 α/β, or you may use the starter provided in this template repository. To start from your React 1 submission, remove all non-hidden files from this repository except for README.md, then copy all the non-hidden files from your React 1 repository into the top level directory of this repository. Finally, add and commit your changes.

When your assignment is ready for grading, please submit to Canvas your repository name and latest commit hash from GitHub Classroom, e.g. `react2-alpha-osori, c13de63`.

## Course data

The course data is being fetched from `http://cs571.cs.wisc.edu:53706/api/react/classes` and is formatted as follows:

```
[
    {
        "credits": <number of credits for the course>,
        "description": <course description>,
        "keywords": <1D list of string keywords>,
        "name": <course name>,
        "number": <unique course number>,
        "requisites": <2D list of course requisites>,
        "sections": [
            {
                "instructor": <instructor name>,
                "location": <section location>,
                "subsections": [
                    {
                        "location": <subsection location>,
                        "time": {
                            <weekday>: <time range>, ...
                        },
    					"number": <subsection number>
                    }
                ],
                "time": {
                <weekday>: <time range>, ...
                },
				"number": <section number>
            }, ...
        ],
        "subject": <course subject>
    }, ...
]
```

- The list of course requisites consists of 1D lists with AND operations between them. Each 1D list has OR operations between elements. For example: `[[A, B], [C, D, E], [F]]` means that the requisites are `(A OR B) AND (C OR D OR E) AND (F)`. The requisites will be represented as the course's alpha-numeric key used in the outermost object.
- Sections and subsections can have any number of times. Each time's key is a weekday in all lowercase ("monday", "tuesday", "wednesday", ...). Each time's value is a string with the following format: `"<12 hour time><am or pm> - <12 hour time><am or pm>"`. An example of this would be `"11:45am - 12:35pm"`.
- Each course has exactly one subject
- Your project must be able to accept any data with the same format as above and the data located at `http://cs571.cs.wisc.edu:53706/api/react/classes`

# Recommender

## Problem 1 (1 point)

- Fetch data from server `http://cs571.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed`. This data details which courses have already been completed.
- Create a new component to display a previously taken course. This component might look somewhat like the Course component, but it will be simpler and won’t have options to add the course to the cart. In addition, it should not display information regarding sections/subsections since they vary between semesters. (You may also reuse the Course component if you can satisfy the aforementioned requirements with conditional rendering. )
- Create a new component to hold the previously taken course components. Make this component accessible as a new tab in the app. (Refer to Problem 2 and Problem 4 for example visualizations)

## Problem 2 (1 point)

- Create a component for rating a specific course. For example, the sample implementation below created the rating component as a child of the completed course component.
- Allow the user to rate courses they have already completed.


![Problem 2 visualization](https://drive.google.com/uc?export=view&id=1543f5d7fxOj4kLfVg6R08dMU--UQro8g)

## Problem 3 (1 point)

- Generate a list of interest areas based on the course data. Note that the interest areas should not be hard-coded but should be based on some values of the course data. For example, the sample implementation below dynamically generates interest areas using keywords from the courses.
- Create a component for the user to filter course results by interest area, using your list of interest areas. Make this component available to the user. The sample implementation put this component in the Sidebar Component.

![Problem 3 visualization](https://drive.google.com/uc?export=view&id=1ClPka8GRXYejO5BUGpPmlIHGDmO-rIhF)

## Problem 4 (2 points)

- Create your own recommender algorithm that takes in the rated courses and interest areas. Use the interest areas of rated courses to recommend courses which have not yet been taken in the interest areas of highly rated completed courses.
- Create a new tab which displays the recommended courses to the user. For instance, the sample implementation below shows several recommended courses in the interest areas of rated courses, sorted by the rating scores user gave for each interest area.
- Note: As long as your algorithm considers user's recommendation score and interest areas you defined in Problem 3, and does not include previously taken courses, the rest of the specifics is up to you.


![Problem 4 visualization](https://drive.google.com/uc?export=view&id=1fjM6VEy118h3dwECWinCCE6AMfLBS1_h)

## Problem 5 (1 point)

- When adding a course to the cart, design a way to let the user know if they are not able to take the course based off of the requisites and the user's previously taken courses. Even if a student does not meet the requisites to enroll in a course, they should still be able to add it to the cart.
- Anytime a course, section, or subsection is added, the user should be notified in some way if they don't meet a requisite. As long as you adhere to this basic requirement, the way to achieve this is completely up to you. (You may use one of the components from Bootstrap, or even a simple JavaScript function.)

## Problem 6 (0.5 points extra credit)

- If the user is not able to take a course in the cart because the user does not meet the requisites, design a way to show the user the possible course paths to take to be able to take the desired course.

## Problem 7 (0.5 points extra credit)

- Create a way for user to select courses they would like to take in the future from the courses they are currently unable to take in the cart (because of requisites). Factor these courses into the recommendation algorithm, giving a larger bias to the courses needed for the selected interest courses.

---

## Styling and npm packages

You are allowed and encouraged to use [react-bootstrap](https://react-bootstrap.github.io/) for styling, and it is already installed in the React project for your use. You may alternatively use [Bootstrap](https://getbootstrap.com/) or CSS for stlying if desired.

If you would like to use additional npm packages, ask one of the TAs or Peer Mentors for permission.

You will be graded on the content you display and the style in which you display it, as well as your code quality.

---

**Run `npm install` in the terminal after cloning to automatically install needed npm packages such as react-bootstrap**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
