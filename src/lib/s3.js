import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";

const region = process.env.AWS_REGION || "ap-south-1";
const bucket = process.env.AWS_S3_BUCKET;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

/**
 * Uploads a buffer to S3 under the /enquiry/ prefix (never foodsnap).
 * @param {Buffer} buffer - File buffer
 * @param {string} originalName - Original filename
 * @param {string} contentType - MIME type
 * @param {"logos"|"menus"} subfolder - Subdirectory under enquiry/
 * @returns {Promise<string>} Public URL of uploaded object
 */
export async function uploadToEnquiryS3(buffer, originalName, contentType, subfolder = "menus") {
    if (!bucket || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        throw new Error("AWS S3 credentials or AWS_S3_BUCKET not configured.");
    }

    const ext = path.extname(originalName) || "";
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    const uniqueKey = `enquiry/${subfolder}/${Date.now()}-${baseName}${ext}`;

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: uniqueKey,
        Body: buffer,
        ContentType: contentType || "application/octet-stream",
    });

    await s3Client.send(command);

    const s3Url = region === "us-east-1"
        ? `https://${bucket}.s3.amazonaws.com/${uniqueKey}`
        : `https://${bucket}.s3.${region}.amazonaws.com/${uniqueKey}`;

    return s3Url;
}
