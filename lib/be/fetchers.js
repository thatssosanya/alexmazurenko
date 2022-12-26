import { MongoClient, ServerApiVersion } from "mongodb"

const mongo = new MongoClient(process.env.MONGO_URL,
  { useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

export const getSectionData = () =>
  mongo.db(process.env.MONGO_DB)
    .collection("sectionData")
    .find({ })
    .sort({ _id: 1 })
    .project({ _id: 0 })
    .toArray()

export const getHeroLines = () =>
  mongo.db(process.env.MONGO_DB)
    .collection("heroLines")
    .find({ })
    .sort({ _id: 1 })
    .project({ _id: 0 })
    .toArray()
    .then(lines => lines.map(({ text }) => text))

export const getProjects = () =>
  mongo.db(process.env.MONGO_DB)
    .collection("projects")
    .find({ })
    .sort({ _id: 1 })
    .project({ _id: 0 })
    .toArray()

export const getSkills = () =>
  mongo.db(process.env.MONGO_DB)
    .collection("skills")
    .findOne({ }, {
      sort: { _id: -1 },
      projection: { _id: 0 }
    })

export const getAboutMe = () =>
  mongo.db(process.env.MONGO_DB)
    .collection("aboutMe")
    .findOne({ }, {
      sort: { _id: -1 },
      projection: { _id: 0 }
    })
    .then(({ html }) => html)

export const getLinks = () =>
  mongo.db(process.env.MONGO_DB)
    .collection("links")
    .find({ })
    .sort({ _id: 1 })
    .project({ _id: 0 })
    .toArray()
