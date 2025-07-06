
// script.js

// Load student name
function loadStudentName() {
  const student = JSON.parse(localStorage.getItem("student"));
  if (student && student.name) {
    const el = document.getElementById("student-name");
    if (el) el.textContent = student.name;
  } else {
    window.location.href = "index.html";
  }
}

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Load course video
function loadCourse() {
  const courseVideos = {
    html: { title: "HTML Basics", video: "https://www.youtube.com/embed/UB1O30fR-EE" },
    css: { title: "CSS Styling", video: "https://www.youtube.com/embed/yfoY53QXEnI" },
    js: { title: "JavaScript Fundamentals", video: "https://www.youtube.com/embed/PkZNo7MFNFg" },
    react: { title: "React.js for Beginners", video: "https://www.youtube.com/embed/bMknfKXIFA8" }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const courseKey = urlParams.get("course");
  const course = courseVideos[courseKey];
  if (course) {
    document.getElementById("course-title").textContent = "Course: " + course.title;
    document.getElementById("video-container").innerHTML =
      `<iframe src="${course.video}" frameborder="0" allowfullscreen></iframe>`;
  }
}

// Mark course as complete
function markProgress() {
  const courseTitles = {
    html: "HTML Basics",
    css: "CSS Styling",
    js: "JavaScript Fundamentals",
    react: "React.js for Beginners"
  };

  const urlParams = new URLSearchParams(window.location.search);
  const courseKey = urlParams.get("course");
  const courseTitle = courseTitles[courseKey];
  if (!courseTitle) return;

  let progress = JSON.parse(localStorage.getItem("progress")) || [];

  // ✅ Check if already marked before saving
  if (!progress.includes(courseTitle)) {
    progress.push(courseTitle);
    localStorage.setItem("progress", JSON.stringify(progress));
    alert("✅ Marked as completed!");
  } else {
    alert("⚠️ This course is already marked as complete.");
  }
}


// Load progress
function loadProgress() {
  const list = document.getElementById("progress-list");
  let progress = JSON.parse(localStorage.getItem("progress")) || [];

  // ✅ Remove duplicates
  progress = [...new Set(progress)];

  if (progress.length === 0) {
    list.innerHTML = "<li>No courses completed yet.</li>";
  } else {
    list.innerHTML = ""; // Clear old list
    progress.forEach(course => {
      const li = document.createElement("li");
      li.textContent = course + " ✅";
      list.appendChild(li);
    });
  }
}


// Save student data
function saveStudentData(event) {
  event.preventDefault();
  const student = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value
  };
  localStorage.setItem("student", JSON.stringify(student));
  localStorage.removeItem("progress"); // Clears previous student's progress
  window.location.href = "courses.html";
}

