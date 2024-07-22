document.getElementById('resume-form').addEventListener('input', function() {
    generateResume();
});

document.getElementById('add-experience').addEventListener('click', function() {
    const experienceSection = document.getElementById('experience-section');
    const newExperienceEntry = document.createElement('div');
    newExperienceEntry.classList.add('experience-entry');
    newExperienceEntry.innerHTML = `
    <label for="job-title">Job Title:</label>
    <input type="text" name="job-title" required>
    
    <label for="company">Company:</label>
    <input type="text" name="company" required>
    
    <label for="job-duration">Duration:</label>
    <input type="text" name="job-duration" required>
    
    <label for="job-description">Description:</label>
    <textarea name="job-description" required></textarea>`;
    
    experienceSection.appendChild(newExperienceEntry);
});

document.getElementById('add-education').addEventListener('click', function() {
    const educationSection = document.getElementById('education-section');
    const newEducationEntry = document.createElement('div');
    newEducationEntry.classList.add('education-entry');
    newEducationEntry.innerHTML = `
    <div class="education-details">
        <label for="education-degree">Degree:</label>
        <input type="text" name="education-degree" required>
        
        <label for="education-college">College/University:</label>
        <input type="text" name="education-college" required>
        
        <label for="education-course">Course/Major:</label>
        <input type="text" name="education-course" required>
    </div>
    <div class="education-duration">
        <label for="education-duration">Duration:</label>
        <input type="text" name="education-duration" required>
    </div>`;
    
    educationSection.appendChild(newEducationEntry);
});

function generateResume() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const linkedin = document.getElementById('linkedin').value;
    const personalPage = document.getElementById('personal-page').value;
    const profile = document.getElementById('profile').value;
    const technicalSkills = document.getElementById('technical-skills').value.split('\n').map(skill => `<li>${skill.trim()}</li>`).join('');
    
    const experienceEntries = Array.from(document.getElementsByClassName('experience-entry')).map(entry => {
        const jobTitle = entry.querySelector('[name="job-title"]').value;
        const company = entry.querySelector('[name="company"]').value;
        const jobDuration = entry.querySelector('[name="job-duration"]').value;
        const jobDescription = entry.querySelector('[name="job-description"]').value.split('\n').map(desc => `<li>${desc.trim()}</li>`).join('');
        return `<h3>${jobTitle}</h3><p>${company} (${jobDuration})</p><ul>${jobDescription}</ul>`;
    }).join('');
    
    const certifications = document.getElementById('certifications').value.split('\n').map(cert => `<li>${cert.trim()}</li>`).join('');
    const certifications2 = [];  // Empty initially for the second column
    
    // Split certifications into two columns
    const certificationList = document.getElementById('certifications').value.split('\n');
    const half = Math.ceil(certificationList.length / 2);
    const certs1 = certificationList.slice(0, half).map(cert => `<li>${cert.trim()}</li>`).join('');
    const certs2 = certificationList.slice(half).map(cert => `<li>${cert.trim()}</li>`).join('');
    
    const professionalSkills = document.getElementById('professional-skills').value.split('\n').map(skill => `<li>${skill.trim()}</li>`).join('');
    
    const educationEntries = Array.from(document.getElementsByClassName('education-entry')).map(entry => {
        const degree = entry.querySelector('[name="education-degree"]').value;
        const college = entry.querySelector('[name="education-college"]').value;
        const duration = entry.querySelector('[name="education-duration"]').value;
        const course = entry.querySelector('[name="education-course"]').value;
        return `<p> ${college}   ${duration}</br>${degree} ${course} </p>`;
    }).join('');
    
    const resumeOutput = document.getElementById('resume-output');
    resumeOutput.innerHTML = `
    <header>
        <h1>${name}</h1>
        <p><a href="mailto:${email}">${email}</a> | <a href="tel:${phone}">${phone}</a> | <a href="${linkedin}" target="_blank">LinkedIn</a> | <a href="${personalPage}" target="_blank">Personal Page</a></p>
        <h2>${title}</h2>
    </header>
    <section>
        <h2>Profile</h2>
        <p>${profile}</p>
    </section>
    <section>
        <h2>Technical Skills</h2>
        <ul>
            ${technicalSkills}
        </ul>
    </section>
    <section>
        <h2>Experience</h2>
        ${experienceEntries}
    </section>
    <section>
        <h2>Certifications</h2>
        <div class="certifications-section">
            <div class="certifications-part">
                <ul>
                    ${certs1}
                </ul>
            </div>
            <div class="certifications-part">
                <ul>
                    ${certs2}
                </ul>
            </div>
        </div>
    </section>
    <section>
        <h2>Professional Skills</h2>
        <ul>
            ${professionalSkills}
        </ul>
    </section>
    <section>
        <h2>Education</h2>
        ${educationEntries}
    </section>`;
}

function printResume() {
    const resumeOutput = document.getElementById('resume-output');
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = resumeOutput.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    generateResume();  // Regenerate the resume after printing to restore the event listeners
}
function downloadPDF() {
    const resumeOutput = document.getElementById('resume-output');
    const name = document.getElementById('name') ? document.getElementById('name').value : 'resume';
    const title = document.getElementById('title') ? document.getElementById('title').value : 'document';
    const fileName = `${name.replace(/\s+/g, '_')}_${title.replace(/\s+/g, '_')}.pdf`;

    const options = {
        margin: [10, 10],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(resumeOutput).set(options).save();
}