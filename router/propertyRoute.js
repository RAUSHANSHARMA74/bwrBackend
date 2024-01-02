const express = require("express");
const { PropertiesModel } = require("../model/propertiesModel");
const propertiesRoutes = express.Router();
// const NodeCache = require("node-cache");

// const myCache = new NodeCache();


//API => http://localhost:5003/api/properties
//GET ALL PROPERTIES DATA 
propertiesRoutes.get("/properties", async (req, res) => {
  try {
    const propertiesData = await PropertiesModel.find();

    if (propertiesData.length > 0) {
      res.status(200).json({
        isError: false,
        message: "Successfully retrieved all properties data",
        dataLength: propertiesData.length,
        propertiesData,
      });
    } else {
      res.status(200).json({
        isError: false,
        message: "No properties data found",
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});



//API => http://localhost:5003/api/properties/query?location=Checkpost, Don Bosco Colony, Siliguri
//GET ALL PROPERTIES DATA BY SEARCH CRITERIA
propertiesRoutes.get("/properties/query", async (req, res) => {
  try {
    const searchParameters = req.query;
    console.log(searchParameters)
    const allPropertiesData = await PropertiesModel.find(searchParameters);

    if (allPropertiesData.length > 0) {
      res.status(200).json({
        isError: false,
        message:
          "Successfully retrieved properties data based on search criteria",
        dataLength: allPropertiesData.length,
        propertiesData: allPropertiesData,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found matching the search criteria",
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});



//API => http://localhost:5003/api/properties/51025992
propertiesRoutes.get("/properties/id/:id", async (req, res) => {
  try {
    let id = req.params.id
    let propertiesData = await PropertiesModel.findById(id);

    if (propertiesData) {
      res.status(200).json({
        isError: false,
        message: "Successfully retrieved all properties data",
        dataLength: propertiesData.length,
        propertiesData,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: "No properties data found",
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});



//API => http://localhost:5003/api/properties/search?keyword=&category=Warehouse&location=Road
//search by keyword, category, location
propertiesRoutes.get("/properties/search", async (req, res) => {
  try {
    let { keyword, category, location, property_type, bedrooms, order, type, item, page, price_range, area_range } = req.query;
    const itemsPerPage = Number(item) || 12;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * itemsPerPage;

    let sortClause = {};
    const query = {};

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = new RegExp(location, 'i'); // Case-insensitive search
    }

    const keywordRegex = new RegExp(keyword, 'i'); // 'i' makes it case-insensitive

    // let filter = {};
    
    if (keyword) {
      query.$or = [
            { category: { $regex: keywordRegex } },
            { title: { $regex: keywordRegex } },
            { property_type: { $regex: keywordRegex } },
            { city: { $regex: keywordRegex } },
            { state: { $regex: keywordRegex } },
            { description: { $regex: keywordRegex } },
            { location: { $regex: keywordRegex } },
            { ownership: { $regex: keywordRegex } },
            { possession_status: { $regex: keywordRegex } },
            { entrance_facing: { $regex: keywordRegex } },
            { floor_no: { $regex: keywordRegex } },
            { amenities: { $regex: keywordRegex } },
            { ownerShip: { $regex: keywordRegex } }, 
           
        ];
    }
    
    // Now, you can use the `filter` object in your MongoDB query to find documents.
    
  
  

    if (property_type) {
      query.property_type = property_type;
    }

    if (bedrooms) {
      query.no_of_bedroom = bedrooms;
    }

    if (order !== "empty" && type !== "empty" && order !== "" && type !== "") {
      sortClause[type] = order === "ASC" ? 1 : -1;
    }

    if (price_range) {
      query.exact_price = {
        $gte: Number(price_range.split(",")[0]),
        $lte: Number(price_range.split(",")[1]),
      };
    }

    if (area_range) {
      query.area = {
        $gte: Number(area_range.split(",")[0]),
        $lte: Number(area_range.split(",")[1]),
      };
    }

    const propertiesData = await PropertiesModel.find(query)
      .sort(sortClause)
      .skip(skip)
      .limit(itemsPerPage);

    const totalItems = await PropertiesModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (propertiesData.length > 0) {
      res.status(200).json({
        isError: false,
        message: "Successfully retrieved properties data based on search criteria",
        totalPages,
        dataLength: propertiesData.length,
        propertiesData,
      });
    } else {
      res.status(200).json({
        isError: false,
        message: "No properties data found for the specified search criteria",
      });
    }

  } catch (error) {
    console.error("Something went wrong in the /properties/search route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});


//API => http://localhost:5003/api/properties/category/Residential
//GET ALL PROPERTIES DATA BY CATEGORY
propertiesRoutes.get("/properties/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const categoryData = await PropertiesModel.find({category})

    if (categoryData) {
      res.status(200).json({
        isError: false,
        message: `Successfully retrieved properties data for category: ${category}`,
        dataLength: categoryData.length,
        propertiesData: categoryData,
      });
    } else {
      res.status(404).json({
        isError: true,
        message: `No properties data found for category: ${category}`,
      });
    }
  } catch (error) {
    console.error("Something went wrong in the /properties route:", error);
    res.status(500).json({
      isError: true,
      message: "Internal server error",
    });
  }
});



module.exports = { propertiesRoutes };
