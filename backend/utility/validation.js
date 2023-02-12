exports.validateUser = (user, res, next) => {
  if (!user) {
    res.status(400);
    return next(new Error("User not logged in"));
  }
  return next;
};

exports.validateRole = (user, role, res, next) => {
  if (user.role !== role) {
    res.status(400);
    return next(new Error(`Unauthorized access. User role must be ${role}`));
  }
  return next;
};

exports.validateClassBelongsInstructor = (user, instructorClass, res, next) => {
  if (user.instructorprofile.toString() !== instructorClass.instructor.toString()) {
    res.status(400);
    return next(new Error(`Class does not belong to instructor`));
  }
  return next;
};