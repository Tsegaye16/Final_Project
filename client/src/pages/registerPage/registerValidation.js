function Validation(values) {
    let error = {};
    let email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
    if (values.name === "") {
      error.name = "name ia not empty";
    } else {
      error.name = "";
    }
    if (values.username === "") {
      error.username = "user name is not empty";
    } else {
      error.username = "";
    }
    if (values.email === "") {
      error.email = "E-mail should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "E-mail  didn't match";
    } else {
      error.email = "";
    }
    if (values.password === "") {
      error.password = "Password should not be empty";
    } else {
      error.password = "";
    }
    return error;
  }
  
export default Validation;