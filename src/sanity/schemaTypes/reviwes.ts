/* eslint-disable import/no-anonymous-default-export */
// schemas/review.js

const review = {
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
      {
        name: 'productId',
        title: 'Product ID',
        type: 'string',
        description: 'ID of the product being reviewed',
      },
      {
        name: 'userName',
        title: 'User Name',
        type: 'string',
        description: 'Name of the person who submitted the review',
      },
      {
        name: 'text',
        title: 'Review Text',
        type: 'text',
        description: 'Review content',
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        description: 'When the review was created',
      },
    ],
  };
  
export default review;