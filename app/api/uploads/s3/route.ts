import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";

const bucketName = process.env.AWS_S3_BUCKET;
const publicBaseUrl = process.env.AWS_S3_PUBLIC_URL;

if (!bucketName || !publicBaseUrl) {
  throw new Error("AWS_S3_BUCKET or AWS_S3_PUBLIC_URL is not set");
}

const normalizedPublicBaseUrl = publicBaseUrl.replace(/\/$/, "");

type UploadRequest = {
  fileName: string;
  contentType: string;
  folder?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as UploadRequest;

  if (!payload?.fileName || !payload?.contentType) {
    return NextResponse.json(
      { error: "fileName and contentType are required" },
      { status: 400 }
    );
  }

  const cleanName = payload.fileName.replace(/\s+/g, "-");
  const timestamp = Date.now();
  const folder = payload.folder ? `${payload.folder}/` : "";
  const key = `${folder}${timestamp}-${cleanName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: payload.contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  const publicUrl = `${normalizedPublicBaseUrl}/${key}`;
  return NextResponse.json({ uploadUrl, publicUrl });
}
