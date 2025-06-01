// js/courseLogic.js

// Declare variables to hold the JSON data
let courseNames = [];
let eligibilityData = [];
let feeData = [];

// Function to load the JSON data
async function loadCourseData() {
    try {
        const [namesResponse, eligibilityResponse, feeResponse] = await Promise.all([
            fetch('../json/course_name.json'),
            fetch('../json/eligibility.json'),
            fetch('../json/fee_data.json')
        ]);

        courseNames = await namesResponse.json();
        eligibilityData = await eligibilityResponse.json();
        feeData = await feeResponse.json();

        console.log("Course data loaded successfully!");
        // console.log("courseNames:", courseNames); // For debugging
        // console.log("eligibilityData:", eligibilityData); // For debugging
        // console.log("feeData:", feeData); // For debugging

    } catch (error) {
        console.error("Error loading course data:", error);
        // You might want to display an error message to the user here
    }
}

// Call the data loading function immediately when the module is imported
// This is important so the data is available when handleUserInput is called later
loadCourseData();


function handleCourseQuery(userInput) {
    const cleanedInput = userInput.toLowerCase();
     console.log("handleCourseQuery: Cleaned user input:", cleanedInput); // NEW DEBUG LOG

    // Ensure data is loaded before trying to access it
    if (courseNames.length === 0) {
        console.warn("Course names data not yet loaded for handleCourseQuery.");
        return null;
    }

    for (const course of courseNames) {
        const courseId = course.course_id; 
  console.log(`handleCourseQuery: Checking course primary name: "${course['primary name']}" (ID: ${courseId})`); // NEW DEBUG LOG
        for (let i = 1; i <= 5; i++) {
            const nameVariant = course[`name_${i}`]?.toLowerCase();
            if (nameVariant && cleanedInput.includes(nameVariant)) {
                 console.log(`  MATCH FOUND for variant "${nameVariant}". Returning courseId: ${courseId}`); // NEW DEBUG LOG
                return courseId;
            }
        }

        const primaryName = course['primary name'].toLowerCase();
        console.log(`  Checking primary name: "${primaryName}"`); // NEW DEBUG LOG
        if (cleanedInput.includes(primaryName)) {
        console.log(`  MATCH FOUND for primary name "${primaryName}". Returning courseId: ${courseId}`); // NEW DEBUG LOG
            return courseId;
        }
    }
    console.log("handleCourseQuery: No course match found for input."); // NEW DEBUG LOG 
    return null;
}

function generateCourseResponse(intent, courseId) { 
    if (feeData.length === 0 || eligibilityData.length === 0) {
        console.warn("Fee or eligibility data not yet loaded for generateCourseResponse.");
        return "Information is not yet available. Please try again in a moment.";
    }

    if (intent === 'course_fees') {
        const feeObj = feeData.find(item => item.course_id === courseId); // Changed fee_id to course_id
        return feeObj ? `The fee for ${getPrimaryCourseName(courseId)} is ${feeObj.fee}.` : "Fee information is not available.";
    }

    if (intent === 'eligibility') {
        const eligibilityObj = eligibilityData.find(item => item.course_id === courseId); // Changed fee_id to course_id
        return eligibilityObj ? `Eligibility for ${getPrimaryCourseName(courseId)}: ${eligibilityObj.eligibility}` : "Eligibility details are not available.";
    }

    return "No information available.";
}

function getPrimaryCourseName(courseId) { // Changed fee_id to courseId
    // Ensure data is loaded before trying to access it
    if (courseNames.length === 0) {
        console.warn("Course names data not yet loaded for getPrimaryCourseName.");
        return "this course";
    }
    const course = courseNames.find(c => c.course_id === courseId); 
    return course ? course["primary name"] : "this course";
}

export { handleCourseQuery, generateCourseResponse, getPrimaryCourseName };