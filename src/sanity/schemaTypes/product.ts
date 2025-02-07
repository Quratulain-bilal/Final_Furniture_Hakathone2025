import { defineType } from "sanity";

export default defineType({
    name: 'shopProduct',
    title: 'Shop Product',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required().min(5).max(100)
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },


        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required().min(10).max(500)
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(0)
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
  name: 'discountPercentage',
  title: 'Discount Percentage',
  type: 'number',
  validation: Rule => Rule.min(0).max(100)
},
{
  name: 'isFeaturedProduct',
  title: 'Is Featured Product',
  type: 'boolean',
  initialValue: false
},
{
  name: 'stockLevel',
  title: 'Stock Level',
  type: 'number',
  validation: Rule => Rule.required().min(0)
},
{
  name: 'category',
  title: 'Category',
  type: 'string',
  options: {
    list: [
      { title: 'Bed', value: 'Bed' },
      { title: 'Sofa', value: 'Sofa' },
      { title: 'Chair', value: 'Chair' },
      { title: 'Table', value: 'Table' },
      { title: 'Wardrobe', value: 'Wardrobe' }
    ]
  },
  validation: Rule => Rule.required()
}
    ]
});

