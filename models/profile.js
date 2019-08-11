const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubUserName: {
    type: String
  },

  experiences: [
    {
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      location: {
        type: String
      },
      from: {
        type: Date,
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  education: [
    {
      school: {
        type: String,
      },
      degree: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedIn: {
      type: String
    },
    instagram: {
      type: String
    }
  },

  // Make skills different and write seperate routes so that skills have a skill level
  // skills: [
  //   {
  //     name: {
  //       type: String,
  //       required: true
  //     },
  //     effeciency: {
  //       type: Number,
  //       required: true
  //     }
  //   }
  // ],

  date: {
    type: Date,
    default: Date.now()
  },
})

module.exports = Profile = mongoose.model('profile', profileSchema)
