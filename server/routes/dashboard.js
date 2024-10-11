const express = require("express");
const {content, contact} = require("../model/model");
const authorize = require("../utils/middleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();
// multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filname: (req, file, cb) => {
    cb(null, new Date() + "_" + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  // limits:{fileSize: '8000000'},
  // fileFilter: (req, file, cb) => {
  //   const fileTypes = /jpeg|jpg|png|gif/;
  //   const mimeType = fileTypes.test(file.mimetype);
  //   const extname = fileTypes.test(path.extname(file.originalname));
  //   if(mimeType && extname) return cb(null, true);
  //   cb('Give proper files formate to upload')
  // }
}).array('images');
// get route for current user
router.get("/blogspot/user", authorize, async(req, res)=> {
 const id = res.user.id;
//  console.log(email);
try {
    const userPosts = await content.find({postedBy: id}).populate('postedBy', '_id name')
    .populate('comments', 'text created').populate('comments.postedBy', '_id name').sort({createdAt: 'desc'});
  if(!userPosts) return res.status(404).json("U haven't made any post");


  return res.json(userPosts);
} catch (error) {
    console.log(error);
    res.status(500).json("server error");
}
});

router.get("/blogspot", async(req, res)=> {
try {
    const blogPosts = await content.find().populate('postedBy', '_id name')
    .populate('comments', 'text created').populate('comments.postedBy', '_id name').sort({createdAt: 'desc'});
  if(!blogPosts) return res.status(404).json("no post at the moment");

  return res.json(blogPosts);
} catch (error) {
    console.log(error);
    res.status(500).json("server error");
}
});
router.get("/blogspot/:id", async(req, res)=> {
    const id = req.params.id;
try {
    const blogPost = await content.find({_id: id}).populate('postedBy', '_id name')
    .populate('comments', 'text created').populate('comments.postedBy', '_id name');
  if(!blogPost) return res.status(404).json("post not found");

  return res.json(blogPost);
} catch (error) {
    console.log(error);
    res.status(500).json("server error");
}
});


// post route for content
router.post("/blogspot", authorize, upload, async(req, res)=> {
  const {title, description, category} = req.body;
  const posts = {title, description, category};
  // const images = image: {
  //       data: req.file.buffer,
  //       contentType: req.file.mimetype
  //     };
  // console.log(req.file);
  console.log(req.files);
  const imageFiles = req.files?.map(file => ( {filename:file.filename, originalname:file.originalname}));
  // const imageName = req.files?.map(name => name.originalname);
  // console.log(imageName);
  console.log(imageFiles);
  console.log(posts);
  const newPost= {...posts, postedBy:res.user.id, images:imageFiles};
  console.log(newPost);

 try {
  // const purse_balance = await purseMoney.findOne({user_id: user_id});
  // const userExpenses = {...newExpense, purseBalance: purse_balance._id};
  const currentContent = await content.create(newPost);
  console.log(currentContent); //
  
// return res.json("success");
return res.status(201).json(currentContent);
 } catch (error) {
  console.log(error.message);
  res.status(501).json({status: "server error", message: error.message});
 }
});


// update or edit route for expenses
router.patch("/blogspot/update/:id", authorize, async(req, res)=> {
  const id = req.params.id;
  console.log(id)
  // const {title, description, category} = req.body;
  const posts = req.body;
  console.log(posts);
  // const posts = {title, description, category};
  const imageFiles = req.files?.map(file => ( {filename:file.filename, originalname:file.originalname}));
  const editPost= {...posts, images:imageFiles};
  console.log(editPost)
  
 
  try {
   const blogPost = await content.findByIdAndUpdate({_id: id},{$set: editPost}, {new:true}).populate('postedBy', '_id name')
   .populate('comments', 'text created').populate('comments.postedBy', '_id name');

   if (!blogPost) return res.status(404).json("data not found");
 console.log(blogPost);
 return res.status(201).json(blogPost);
  } catch (error) {
   console.log(error.message);
   res.status(500).json({status: "server error", message: error.message});
  }
 });
 // delete route for expenses
 router.delete("/blogspot/delete/:id", async(req, res)=> {
  const id = req.params.id;
  try {
    content.findByIdAndDelete(id).then(()=> res.status(201).json("deleted successfully"));

  } catch (error) {
    console.log(error.message);
    res.status(500).json({status: "server error", message: error.message});
  }
 });

 router.put("/blogspot/comments/:id", authorize, async (req, res) => {
  const id = req.params.id;
  console.log(res.user.id);
  console.log(id);

  try {
    const NewComment = req.body;
    const comment = {...NewComment, postedBy: res.user.id}
    console.log(comment);
    const post = await content.findByIdAndUpdate({_id:id}, {$push: {comments: comment} }, {new:true}).populate('postedBy', '_id name').populate('comments.postedBy', 'id name');
    if(!post) return res.status(404).json("post not found");

    res.json(post);

  } catch (error) {
    console.log(error.message);
    res.status(500).json("server error", error.message);
  }
 })
//  router.put("/blogspot/comments/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id)

//   try {
//     const comment = req.body;
//     console.log(comment);
//     const post = await content.findByIdAndUpdate({_id:id}, {$push: {comments: comment} }, {new:true}).populate('postedBy', '_id name').populate('comments.postedBy', 'id name');
//     if(!post) return res.status(404).json("post not found");

//     res.json(post);

//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("server error", error.message);
//   }
//  });

 
//  router.put("/blogspot/comments/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id)

//   try {
//     const comment = req.body;
//     console.log(comment);
//     const post = await content.findByIdAndUpdate({_id:id}, {$push: {comments: comment} }, {new:true}).populate('postedBy', '_id name').populate('comments.postedBy', 'id name');
//     if(!post) return res.status(404).json("post not found");

//     res.json(post);

//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("server error", error.message);
//   }
//  });
//  router.put("/blogspot/comments/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id)

//   try {
//     const comment = req.body;
//     console.log(comment);
//     const post = await content.findByIdAndUpdate({_id:id}, {$push: {comments: comment} }, {new:true}).populate('postedBy', '_id name').populate('comments.postedBy', 'id name');
//     if(!post) return res.status(404).json("post not found");

//     res.json(post);

//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json("server error", error.message);
//   }
//  });
 router.put("/blogspot/uncomments/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)

  try {
    const comment = req.body;
    console.log(comment);
    const post = await content.findByIdAndUpdate({_id:id}, {$pull: {comments: {_id: comment._id}} }, {new: true}).populate('postedBy', '_id name').populate('comments.postedBy', 'id name');
    if(!post) return res.status(404).json("post not found");

    res.json(post);

  } catch (error) {
    console.log(error.message);
    res.status(500).json("server error", error.message);
  }
 });

 router.post("/contact", async (req, res) => {
  const {name, email, phone, message} = req.body;
  

  try {
    if (name.trim()==="" || email.trim()==="" || phone.trim()==="" || message.trim()==="" ) {
      return res.status(400).json("some fields missing")
    };
    const post = { name, email, phone, message};
    console.log(post)
    await contact.create(post);

    res.json("sucess")
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message)
  }
 })


module.exports = router;