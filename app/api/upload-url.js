import aws from 'aws-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileName, fileType } = req.body;

  // AWS S3 Configuration
  const S3_BUCKET = process.env.S3_BUCKET_NAME;
  const REGION = process.env.AWS_REGION;

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: REGION,
    signatureVersion: 'v4',
  });

  try {
    const s3Key = `videos/${Date.now()}_${fileName}`;
    const params = {
      Bucket: S3_BUCKET,
      Key: s3Key,
      Expires: 60, // Pre-signed URL expires in 60 seconds
      ContentType: fileType,
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

    res.status(200).json({ uploadUrl, fileKey: s3Key });
  } catch (error) {
    res.status(500).json({ error: 'Error generating pre-signed URL' });
  }
}
