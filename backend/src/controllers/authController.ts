import { Request, Response } from "express";
// Load Input Validation
import * as validateRegisterInput from "../validation/register";
import * as validatePostsInput from "../validation/posts";
import * as isEmpty from "../validation/is-empty";
import * as validateLoginInput from "../validation/login";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as User from "../models/User";
import * as Verify from "../models/Verify";
import * as Posts from "../models/Posts";
import * as gravatar from "gravatar";

export class AuthController {
  public loginUser(req: Request, res: Response) {
    const { errors } = validateLoginInput(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.userType;

    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      if (!userType) {
        errors.userType = "User type not found";
        return res.status(404).json(errors);
      }

      if (user.userType !== userType) {
        errors.userType = "User type does not match";
        return res.status(400).json(errors);
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User Matched

            const payload = {
              id: user.id,
              fullname: user.fullname,
              username: user.username,
              email: user.email,
              userType: user.userType
            };
            //Sign Token
            jwt.sign(
              payload,
              process.env.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                Verify.findOne({ user: user.id })
                  .then(data => {
                    return res.json({
                      success: true,
                      // profilecreated: data.profilecreated,
                      token: "Bearer " + token
                    });
                  })
                  .catch(err => console.log("Error from loginUser", err));
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(404).json(errors);
          }
        })
        .catch(err => console.log("Error from loginUser", err));
    });
  }


  public addNewUser(req: Request, res: Response) {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    }).then(user => {
      if (user) {
        if (user.username && user.username === req.body.username) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        } else if (user.email && user.email === req.body.email) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
        }
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" // Default
        });

        const newUser = new User({
          username: req.body.username,
          fullname: req.body.fullname,
          email: req.body.email,
          userType: req.body.userType,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const verify = new Verify({
                  user: user._id,
                  // profilecreated: false
                });

                // Login 

                User.findOne({ email: req.body.email }).then(user => {
                  if (!user) {
                    errors.email = "User not found";
                    return res.status(404).json(errors);
                  }
                  // Make sure the user has been verified
                  // if (!user.isVerified) {
                  //   errors.email = "Your email has not been verified.";
                  //   errors.resend = "Resend Verification Email";
                  //   return res.status(401).send(errors);
                  // }

                  bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                      if (isMatch) {
                        //User Matched

                        const payload = {
                          id: user.id,
                          fullname: user.fullname,
                          username: user.username,
                          email: user.email,
                          userType: user.userType
                        };
                        //Sign Token
                        jwt.sign(
                          payload,
                          process.env.secretOrKey,
                          { expiresIn: 3600 },
                          (err, token) => {
                            Verify.findOne({ user: user.id })
                              .then(data => {
                                return res.json({
                                  success: true,
                                  // profilecreated: data.profilecreated,
                                  token: "Bearer " + token
                                });
                              })
                              .catch(err => console.log("Error from loginUser", err));
                          }
                        );
                      } else {
                        errors.password = "Password incorrect";
                        return res.status(404).json(errors);
                      }
                    })
                    .catch(err => console.log("Error from loginUser", err));
                });
                // Login end
              })
              .catch(err => console.log("Error from addnewuser", err));
          });
        });
      }
    });
  }

  // posts
  public createPosts(req: Request, res: Response) {
    const { errors, isValid } = validatePostsInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Posts.findOne({ _id: req.body.id }).then(post => {
      if (post) {
        // Update
        Posts.findOneAndUpdate(
          { _id: req.body.id },
          {
            $set: {
              _id: req.body.id,
              title: req.body.title,
              description: req.body.description
            }
          },
          { new: true }
        )
          .then(post => res.json(post))
          .catch(err =>
            console.log("Error from create posts: ", err)
          );
      } else {
        // Create
        // Save post
        new Posts({
          user: req.user.id,
          title: req.body.title,
          description: req.body.description
        })
          .save()
          .then(post => {
            if (post) {
              return res.status(200).json(post);
            }
          })
          .catch(err => console.log("Error from create posts: ", err));
      }
    });
  }

  // get all post
  public getAllPosts(req: Request, res: Response) {
    Posts.find({}).then(post => {
      return res.status(200).json(post);
    });
  }

  // get my post
  public getMyPosts(req: Request, res: Response) {
    // const { errors, isValid } = validatePostsInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    User.find({ _id: req.user.id })
      .then((user) => {
        if (user) {
          if (user[0].userType === "admin") {
            // User.find({ userType: "user" }).then(user => {
            //   return res.status(200).json(user);
            // });
            Posts.find({ user: req.user.id }).then(post => {
              return res.status(200).json(post);
            });
          } else {
            return res.status(500).json({ success: false, msg: "You are not authorized." })
          }
        }
      })
  }


  // get my post
  public deleteMyPost(req: Request, res: Response) {

    Posts.deleteOne({ _id: req.params.id }).then(post => {
      return res.status(200).json(post);
    });
  }

  // get all user
  public getAllUser(req: Request, res: Response) {

    User.find({ _id: req.user.id })
      .then((user) => {
        if (user) {
          if (user[0].userType === "admin") {
            User.find({ userType: "user" }).then(user => {
              return res.status(200).json(user);
            });
          } else {
            return res.status(500).json({ success: false, msg: "You are not authorized." })
          }
        }
      })
  }

  // get current user
  public current(req: Request, res: Response) {
    User.findOne({ _id: req.user.id })
      .then((user) => {
        return res.status(200).json(user);
      })
  }

  // remove user
  public removeUser(req: Request, res: Response) {

    User.find({ _id: req.user.id })
      .then((user) => {
        if (user) {
          if (user[0].userType === "admin") {
            User.deleteOne({ _id: req.params.id })
              .then(data => {
                return res.status(200).json({ success: "deleted" });
              })
              .catch(err => console.log("error from deleteUser", err));
          } else {
            return res.status(500).json({ success: false, msg: "You are not authorized." })
          }
        }
      })
  }

  // like post
  public likePost(req: Request, res: Response) {

    User.findOne({ _id: req.user.id })
      .then((user) => {
        if (!isEmpty(user)) {
          // find element
          if (user.likedposts.includes(req.params.id)) {
            // remove element from array
            // var index = user.likedposts.indexOf(req.params.id);
            // if (index > -1) {
            //   user.likedposts.splice(index, 1);
            // }
            // Delete Item
            let valueToRemove = req.params.id
            user.likedposts = user.likedposts.filter(item => item !== valueToRemove)
            user
              .save()
              .then(profile => res.status(200).json({ success: "disliked" }))
              .catch(err => console.log("Error from likePost", err));
          } else {
            // if element is not in array
            user.likedposts.push(req.params.id)
            user
              .save()
              .then(profile => res.status(200).json({ success: "liked" }))
              .catch(err => console.log("Error from likePost", err));
          }
        }
      })
  }

  public addUserByAdmin(req: Request, res: Response) {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    }).then(user => {
      if (user) {
        if (user.username && user.username === req.body.username) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        } else if (user.email && user.email === req.body.email) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
        }
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" // Default
        });

        const newUser = new User({
          username: req.body.username,
          fullname: req.body.fullname,
          email: req.body.email,
          userType: req.body.userType,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const verify = new Verify({
                  user: user._id,
                  // profilecreated: false
                });

                // Login 

                User.findOne({ email: req.body.email }).then(user => {
                  if (!user) {
                    errors.email = "User not found";
                    return res.status(404).json(errors);
                  }

                  bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                      if (isMatch) {
                        //User Matched

                        const payload = {
                          id: user.id,
                          fullname: user.fullname,
                          username: user.username,
                          email: user.email,
                          userType: user.userType
                        };
                        //Sign Token
                        jwt.sign(
                          payload,
                          process.env.secretOrKey,
                          { expiresIn: 3600 },
                          (err, token) => {
                            Verify.findOne({ user: user.id })
                              .then(data => {
                                return res.status(200).json({
                                  success: true
                                });
                              })
                              .catch(err => console.log("Error from adduserbyadmin", err));
                          }
                        );
                      } else {
                        errors.password = "Password incorrect";
                        return res.status(404).json(errors);
                      }
                    })
                    .catch(err => console.log("Error from adduserbyadmin", err));
                });
                // Login end
              })
              .catch(err => console.log("Error from adduserbyadmin", err));
          });
        });
      }
    });
  }
}