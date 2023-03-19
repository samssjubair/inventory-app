const multer  = require('multer')
const path =require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })

const upload = multer({
    //  dest: 'image/' ,
    storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedExtension=/png|jpg/;
        const extension=path.extname(file.originalname);

        if(supportedExtension.test(extension)){
            cb(null,true);
        }else{
            cb(new Error('File type not must be jpg or png'),false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
}
)
module.exports=upload;

