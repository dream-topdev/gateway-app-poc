Project Name: Gateway-app-poc

Description:

Gateway-app-poc is a proof-of-concept application designed to demonstrate a simplified gateway for Amazon Marketplace sellers to manage their stores. Using the Amazon Selling Partner API (SP-API), it allows users to connect their Seller Central accounts and perform key tasks like creating, modifying, or deleting product listings and tracking inventory and order statuses through a basic interface. Built as a public seller application, this POC focuses on validating core functionality using minimal setup, leveraging SP-API sandbox testing and basic AWS credentials without an IAM role for initial development.

Key Features:

Account Integration: Links Seller Central accounts via OAuth.
Product Management: Supports creating, editing, and deleting product listings.
Store Monitoring: Tracks inventory levels and order statuses in real time.
POC Focus: Tests seller functionality with a lightweight setup, excluding IAM roles for now.
Target Audience:

Third-party sellers using Seller Central, particularly for testing basic store management.
Technical Foundation:

Utilizes the Amazon SP-API for Seller Central interactions.
Requires an AWS account for registration and basic credentials, but skips IAM role setup for simplicity.
Registered as a public seller application in Seller Central for POC testing.