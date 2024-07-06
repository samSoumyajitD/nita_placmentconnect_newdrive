const { MongoClient, ServerApiVersion } = require('mongodb');

const schema = {
  bsonType: "object",
  required: [
    "company", "roles", "companyTier", "ctc", "roleType", "branchesAllowed",
    "degreesAllowed", "graduationYearsAllowed", "selectionProcess", "postDate",
    "deadline",  "facultyCoordinator", "studentCoordinator"
  ],
  properties: {
    company: {
      bsonType: "string",
      description: "Name of the company"
    },
    roles: {
      bsonType: "array",
      description: "Role offered"
    },
    companyTier: {
      bsonType: "string",
      description: "Tire level"
    },
    ctc: {
      bsonType: "string",
      description: "CTC offered"
    },
    roleType: {
      bsonType: "string",
      description: "Type of role"
    },
    mini10thMarksRequired: {
      bsonType: "decimal",
      description: "10th marks required"
    },
    mini12thMarksRequired: {
      bsonType: "decimal",
      description: "12th marks required"
    },
    cgpa: {
      bsonType: "decimal",
      description: "CGPA required"
    },
    branchesAllowed: {
      bsonType: "array",
      items: {
        bsonType: "string"
      },
      description: "Branches allowed"
    },
    degreesAllowed: {
      bsonType: "array",
      items: {
        bsonType: "string"
      },
      description: "Degrees allowed"
    },
    years: {
      bsonType: "array",
      items: {
        bsonType: "int"
      },
      description: "Graduation years allowed"
    },
    selectionDomCode: {
      bsonType: "string",
      description: "Selection Process"
    },
  
    noofgapYearsAllowed: {
      bsonType: "int",
      description: "Number of gap years allowed"
    },
    allowBackloghis: {
      bsonType: "bool",
      description: "Is backlog history allowed"
    },
    activeBacklogsAllowed: {
      bsonType: "int",
      description: "Number of active backlogs allowed"
    },
    postDate: {
      bsonType: "date",
      description: "Post date"
    },
    deadlineDateTime: {
      bsonType: "date",
      description: "Deadline to apply"
    },
    
    jobDDomCode: {
       bsonType: "string",
      description: "jd"
    },
    gender: {
      bsonType: "string",
      description: "Gender allowed"
    },
    facultyCoordinator: {
      bsonType: "string",
      description: "Faculty coordinator"
    },
    studentCoordinator: {
      bsonType: "string",
      description: "Student coordinator"
    },
    
  }
};

async function createCollection(client) {
  const db = client.db('Job_Listing');
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);

  if (!collectionNames.includes('jobs')) {
    await db.createCollection('jobs', {
      validator: {
        $jsonSchema: schema
      }
    });
    console.log("Created 'jobs' collection with schema validation");
  }
}

module.exports = { createCollection };
