export const renderClassroomGrid = (parent, classroomArray) => {
  let classrooms = '';
  classroomArray.forEach((classroom) => {
    const classroomMarkup = `
      <div class="classroom classroom-${classroom.id}" data-classroom=${classroom.id}>
        <div class="classroom__details">
          <div class="name">${classroom.name}</div>
        </div>
      </div> 
    `;
    classrooms += classroomMarkup;
  });

  // Have an IF statement to determine if they are student or teacher.
  const markup = `
    <div class="make-classroom">
        <a href="#" class="btn btn--ghost make-classroom">Make A New Classroom</a>
    </div>

    <div class="classroom-grid">
        ${classrooms}
    </div>;`;

  parent.insertAdjacentHTML('afterbegin', markup);
};

export const renderMakeClassroomGrid = (
  parent,
  studentArray,
  currStudentArray
) => {
  // Table for Add Students to the classroom TODO: get the add button to work
  let studentTable = '';
  studentArray.forEach((user) => {
    const studentMarkup = `
    <tr class="user user-${user.id}">
      <th>${user.name}</th>
      <th>${user.email}</th>
      <th><input type="button" value="Add" href="#"></input></th>
    </tr>
    `;

    studentTable += studentMarkup;
  });

  // Table for Students in the Classroom TODO: get the remove button to work
  let currStudentTable = '';
  currStudentArray.forEach((user) => {
    const currStudentMarkup = `
      <tr class="user user-${user.id}">
        <th>${user.name}</th>
        <th>${user.email}</th>
        <th><input type="button" value="Remove" href="#"></input></th>
      </tr>
    `;
  });

  const markup = `
    <div class="make-classroom-grid">

    <form action="#" class="make-classroom__form">
        <label for="deck-name" class="make-classroom__label">Enter Classroom name</label>
        <textarea id="deck-name" class="make-classroom__textarea  textarea-q" wrap="off" minlength="5" maxlength="250" placeholder="Enter your classroom name" required="true" spellcheck="true"></textarea>
    </form>
    <div class="make-classroom__table">
      <div class="make-classroom__table-scroll" style="float:left;">
      <label class="make-classroom__label">Add Students</label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody class="classroom-table-add__body">
          ${studentTable}
        </tbody>
      </table>
      </div>

      <div class="make-classroom__table-scroll" style="float:right;">
      <label class="make-classroom__label">Current Students</label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody class="classroom-table-add__body">
          ${currStudentBody}
        </tbody>
      </table>
      </div>
    </div>
    
    <div class="make-classroom__group make-classroom--right">
      <a href="#" class="make-classroom__link">
        <svg class="icon icon--make-classroom icon--make-classroom-right icon--right">
          <use href="img/SVG/check.svg"></use>
        </svg>
      </a>
      <span class="make-classroom__span">Create The Classroom</span>
    </div>

    <div class="make-classroom__group make-classroom--wrong">
      <a href="#" class="make-classroom__link">
        <svg class="icon icon--make-classroom icon--make-classroom-left icon-left icon--wrong">
          <use href="img/SVG/circle-with-cross.svg"></use>
        </svg>
      </a>
      <span class="make-classroom__span">Let's Stop!</span>
    </div>
  </div>
`;

  parent.insertAdjacentHTML('afterbegin', markup);
};
