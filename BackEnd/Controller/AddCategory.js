


const AddItem = require('../Model/ItemSchema')



const CreateCetegory = async (req, res) => {
  const { categoryName } = req.body; // Extract category name
  const categoryImage = req.file ? req.file.path : null; // Image path
  
  try {
    const newCategory = new AddItem({
      category: categoryName,
      categoryImage: categoryImage,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getCetegory = async (req,res )=>{

  try {
    const category = AddItem.find({})
    res.status(201).json(category)
    console.log('Feath cetegory' )
  } catch (error) {
    res.status(501).json({message:"cetegory wos not featched"})
  }
}

module.exports={CreateCetegory,getCetegory}


