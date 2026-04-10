# n8n-nodes-fatura-entegrator

This is an n8n community node for the [Fatura Entegratör](https://faturaentegrator.com) API. It lets you manage invoices, customers, products, and integrations directly from your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Invoice
- Create a new invoice
- Get invoice by ID
- Get all invoices
- Cancel an invoice
- Get invoice PDF
- Send invoice PDF via email

### Customer
- Create a new customer
- Get customer by ID
- Get all customers
- Update a customer
- Delete a customer

### Product
- Create a new product
- Get product by ID
- Get all products
- Update a product
- Delete a product

### Integration
- Get all sale channels
- Get all invoice integrations

### Trigger
- Webhook trigger that fires when invoice status changes (completed, failed, etc.)

## Credentials

To use this node, you need a Fatura Entegratör API key:

1. Sign up or log in at [app.faturaentegrator.com](https://app.faturaentegrator.com)
2. Navigate to your account settings
3. Generate an API key
4. Use the API key in the n8n credentials configuration

## Resources

- [Fatura Entegratör API Documentation](https://dev.faturaentegrator.com)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
