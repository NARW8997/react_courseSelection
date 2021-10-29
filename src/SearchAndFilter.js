class SearchAndFilter {
  searchAndFilter(
    courses,
    search,
    subject,
    minimumCredits,
    maximumCredits,
    keys
  ) {
    if (subject !== "" && search !== null) {
      let coursesAfterSearch = [];

      for (const course of courses) {
        for (const keyword of course.keywords) {
          if (keyword.includes(search)) {
            coursesAfterSearch.push(course);
            break;
          }
        }
      }
      courses = coursesAfterSearch;
    }

    if (keys) {
      let coursesAfterSearch = courses
        .map((it, index) => {
          if (it.keywords.includes(keys)) {
            return it;
          }
          return null;
        })
        .filter((value) => value);

      courses = coursesAfterSearch;
    }

    if (subject !== "All") {
      let coursesAfterSubject = [];

      for (const course of courses) {
        if (course.subject === subject) coursesAfterSubject.push(course);
      }
      courses = coursesAfterSubject;
    }

    if (minimumCredits !== "") {
      let coursesAfterMinimumCredits = [];

      for (const course of courses) {
        if (course.credits >= parseInt(minimumCredits))
          coursesAfterMinimumCredits.push(course);
      }
      courses = coursesAfterMinimumCredits;
    }

    if (maximumCredits !== "") {
      let coursesAfterMaximumCredits = [];

      for (const course of courses) {
        if (course.credits <= parseInt(maximumCredits))
          coursesAfterMaximumCredits.push(course);
      }
      courses = coursesAfterMaximumCredits;
    }

    return courses;
  }
}

export default SearchAndFilter;
