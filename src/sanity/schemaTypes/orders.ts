import { defineField, defineType } from "sanity"

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
    }),
    defineField({
      name: "customer",
      title: "Customer",
      type: "object",
      fields: [
        { name: "firstName", type: "string" },
        { name: "lastName", type: "string" },
        { name: "email", type: "string" },
        { name: "phone", type: "string" },
      ],
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        { name: "streetAddress", type: "string" },
        { name: "townCity", type: "string" },
        { name: "province", type: "string" },
        { name: "zipCode", type: "string" },
        { name: "country", type: "string" },
      ],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", type: "string" },
            { name: "name", type: "string" },
            { name: "quantity", type: "number" },
            { name: "price", type: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "total",
      title: "Total",
      type: "number",
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
  ],
})

