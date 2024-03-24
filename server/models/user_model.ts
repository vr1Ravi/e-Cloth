import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 0. Creating type for address, avatar.
interface Address {
  _id: Types.ObjectId;
  country: String;
  city: String;
  address1: String;
  address2: String;
  zipCode: Number;
  addressType: String;
}

interface Avatar {
  public_id: {
    type: String;
    required: true;
  };
  url: {
    type: String;
    required: true;
  };
}

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: String;
  phoneNumber: Number;
  addresses: Types.DocumentArray<Address>;
  role: String;
  createdAt: Date;
  avatar?: Avatar;
  resetPasswordToken: String;
  resetPasswordTime: Date;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, "Please enter your name"] },
  email: { type: String, required: [true, "Please enter your email"] },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minlength: [6, "Password should be greater than 5"],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      addressType: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  role: {
    type: String,
    default: "user",
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resetPasswordTime: Date,
  resetPasswordToken: String,
});

// Adding methods to userSchema
// Hash Password
userSchema.pre("save", async function (next) {
  !this.isModified("password") && next();
  const hash = await bcrypt.hash(this.password as string, 10);
  this.password = hash;
});

userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
// 3. Create a Model.
export const User = model<IUser>("User", userSchema);

/**
 *
 * In summary, phoneNumber: { type: Number } is the correct way to define a field with the type Number in a
 *  Mongoose schema, ensuring that Mongoose treats the field appropriately, including type casting and
 * validation. phoneNumber: Number is not a standard way to define a field in a Mongoose schema and is
 * likely to be treated as a plain JavaScript object property rather than a Mongoose schema field.
 */
