const { MongoClient, ServerApiVersion } = require('mongodb');

const schema = {
  bsonType: "object",
  required: [
    "company", "roles", "companyTier", "ctc", "roleType", "branchesAllowed",
    "degreesAllowed", "graduationYearsAllowed", "selectionProcess", "postDate",
    "deadline", "facultyCoordinator", "studentCoordinator"
  ],
  properties: {
    company: {
      bsonType: "string",
      description: "Name of the company"
    },
    roles: {
      bsonType: "array",
      items: {
        bsonType: "string"
      },
      description: "Roles offered"
    },
    companyTier: {
      bsonType: "string",
      description: "Tier level"
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
    graduationYearsAllowed: {
      bsonType: "array",
      items: {
        bsonType: "int"
      },
      description: "Graduation years allowed"
    },
    selectionProcess: {
      bsonType: "string",
      description: "Selection process"
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
    deadline: {
      bsonType: "date",
      description: "Deadline to apply"
    },
    jobDDomCode: {
      bsonType: "string",
      description: "Job description"
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
    fillfrom: {
      bsonType: "array",
      items: {
        bsonType: "string"
      },
      description: "Fill from"
    },
    items: {
      bsonType: "array",
      items: {
        bsonType: "object",
        properties: {
          key: {
            bsonType: "string",
            description: "Key"
          },
          values: {
            bsonType: "array",
            items: {
              bsonType: "string"
            },
            description: "Values"
          }
        }
      },
      description: "Items"
    },
    mitems: {
      bsonType: "array",
      items: {
        bsonType: "object",
        properties: {
          key: {
            bsonType: "string",
            description: "Key"
          },
          values: {
            bsonType: "array",
            items: {
              bsonType: "string"
            },
            description: "Values"
          }
        }
      },
      description: "MItems"
    }
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
