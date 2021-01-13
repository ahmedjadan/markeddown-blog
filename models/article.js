const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const getSlug = require("speakingurl");
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom')

const dompurify = createDomPurify(new JSDOM().window)

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    markdown: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      
    },
    sanitizedHtml: {
      type: String,
      required: true
    }
 
  },
  { timestamps: true }
);



articleSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

const Article = mongoose.model("Article", articleSchema);


module.exports = Article;
