import Employee from "../models/employee.model.js";

const createEmployee = async (req, res) => {
  try {
    const { name, email, mobileNumber, designation, gender, course, imageUrl } =
      req.body;

    if (
      !name ||
      !email ||
      !mobileNumber ||
      !designation ||
      !gender ||
      !course ||
      !imageUrl
    ) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields" });
    }

    const findEmail = await Employee.findOne({ email });

    if (findEmail) {
      return res
        .status(409)
        .json({ error: "Employee with this email address already exists!!" });
    }

    const findPhone = await Employee.findOne({ mobileNumber });

    if (findPhone) {
      return res.status(409).json({ error: "Mobile number already in use" });
    }

    const employee = new Employee({
      name,
      email,
      mobileNumber,
      designation,
      gender,
      course,
      imageUrl,
    });

    await employee.save();

    return res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const {
      _id,
      name,
      email,
      mobileNumber,
      designation,
      gender,
      course,
      imageUrl,
    } = req.body;

    if (
      !_id ||
      !name ||
      !email ||
      !mobileNumber ||
      !designation ||
      !gender ||
      !course ||
      !imageUrl
    ) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields" });
    }

    const employee = await Employee.findById({ _id });

    if (!employee) {
      return res.status(404).json({ error: "User not found!" });
    }

    employee.name = name;
    employee.email = email;
    employee.mobileNumber = mobileNumber;
    employee.designation = designation;
    employee.gender = gender;
    employee.course = course;
    employee.imageUrl = imageUrl;

    await employee.save();

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Employee.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Deleted successfully" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const getEmployeeDetails = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.rowsPerPage || 4;
    const skip = (page - 1) * limit;

    const searchTerm = req.query.searchTerm || "";

    let query = {};

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
      console.log(searchRegex);
      query["$or"] = [
        { name: searchRegex },
        { email: searchRegex },
        { designation: searchRegex },
      ];
    }


    const employees = await Employee.find(query).skip(skip).limit(limit);

    const count = await Employee.countDocuments();

    return res.status(200).json({ employees, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

export default {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeDetails,
};
