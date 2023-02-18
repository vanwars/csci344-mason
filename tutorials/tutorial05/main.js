// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that 
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of 
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = ev => {
    ev.preventDefault(); // overrides default button action

    // Get user's preferences:
    const searchTerm = document.querySelector('#search_term').value;
    const openOnly = document.querySelector('#is_open').checked;
    
    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
}

// Part 1.1a
const filterClassFull = course => {
    // modify this
    return course.EnrollmentCurrent < course.EnrollmentMax ? true : false;
}

// Part 1.1b
const filterTermMatched = course => {
    // modify this
    const searchTerm = document.querySelector('#search_term').value.toLowerCase();
    const instructorName = course.Instructors[0].Name.toLowerCase();
    if(course.Title.toLowerCase().includes(searchTerm) || instructorName.includes(searchTerm)) {
        return true;
    } else {
        return false;
    }
}

// Part 1.2
const dataToHTML = course => {
    const seatSAvailable = course.EnrollmentMax - course.EnrollmentCurrent;
    // modify this
    if(course.Classification.Open == true) {
        return `
        <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                <i class="fa-solid fa-circle-check"></i> 
                Open  &bull; ${course.CRN} &bull; Seats Available: ${course.EnrollmentMax - course.EnrollmentCurrent}
            </p>
            <p>
                ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>`;
    } else {
        return `
        <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                <i class="fa-solid fa-circle-xmark"></i> 
                Closed  &bull; ${course.CRN} &bull; Seats Available: 0
            </p>
            <p>
                ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>`;
    }
}

// Part 2
const showData = (searchTerm, openOnly) => {
    console.log(searchTerm, openOnly);
    console.log(data); // imported from course-data.js
    // Your code here:
    const dataThatMatchesQuery = data.filter(filterTermMatched);
    if(openOnly == true) {
        const onlyShowOpenClassesIfSpecified = dataThatMatchesQuery.filter(filterClassFull);
        const listOfHTMLChunks = onlyShowOpenClassesIfSpecified.map(dataToHTML);
        console.log("List of Strings:", listOfHTMLChunks);
        const megaString = listOfHTMLChunks.join('');
        console.log(megaString);
        //clear out the old results
        document.querySelector('.courses').innerHTML = "";
        //add the new ones
        document.querySelector('.courses').insertAdjacentHTML('beforeend', megaString);
    } else {
        const listOfHTMLChunks = dataThatMatchesQuery.map(dataToHTML);
        console.log("List of Strings:", listOfHTMLChunks);
        const megaString = listOfHTMLChunks.join('');
        console.log(megaString);
        //clear out the old results
        document.querySelector('.courses').innerHTML = "";
        //add the new ones
        document.querySelector('.courses').insertAdjacentHTML('beforeend', megaString);
    }

    /*document.querySelector('.courses').insertAdjacentHTML('beforend', data.filter(
        filterTermMatched).filter(
            filterClassFull
        ).map(
            dataToHTML
        ).join(''))*/
}