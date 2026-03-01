import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import crypto from "crypto";

export const uploadFile = createServerFn({ method: "POST" }).handler(
  async () => {
    const request = getRequest();

    try {
      const formData = await request.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return { error: "No file uploaded", status: 400 };
      }

      // Enforce 50MB limit
      const MAX_SIZE = 50 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        return { error: "File size exceeds 50MB limit", status: 400 };
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload the file to Azure Blob Storage using Managed Identity
      const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
      const containerName =
        process.env.AZURE_STORAGE_CONTAINER_NAME || "videos";

      if (!accountName) {
        console.error("AZURE_STORAGE_ACCOUNT_NAME is not defined");
        return {
          error: "Server configuration error setup for uploads",
          status: 500,
        };
      }

      const accountUrl = `https://${accountName}.blob.core.windows.net`;
      const credential = new DefaultAzureCredential();
      const blobServiceClient = new BlobServiceClient(accountUrl, credential);
      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      // Ensure container exists
      await containerClient.createIfNotExists();

      const uuid = crypto.randomUUID();
      const blobName = `${uuid}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      console.log(
        `Uploading ${blobName} to Azure Blob Storage in container ${containerName}...`,
      );
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: file.type || "video/mp4" },
      });
      console.log(`Successfully uploaded ${blobName}`);

      return {
        success: true,
        message: "File uploaded successfully to Azure",
        blobName: blobName,
        blobUrl: blockBlobClient.url,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      return {
        error: "Failed to upload file due to server error",
        status: 500,
      };
    }
  },
);
