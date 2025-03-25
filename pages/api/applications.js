// pages/api/applications.js

import dbConnect from '../../utils/db';
import Application from '../../models/Application';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST': {
      // Create a new application
      try {
        const {
          firstName,
          lastName,
          street1,
          street2,
          city,
          stateValue,
          zip,
          phone,
          additionalRenters,
          startDate,
          endDate,
        } = req.body;

        const newApp = await Application.create({
          firstName,
          lastName,
          street1,
          street2,
          city,
          stateValue,
          zip,
          phone,
          additionalRenters,
          startDate,
          endDate,
        });

        return res
          .status(201)
          .json({ message: 'Application saved', appId: newApp._id });
      } catch (error) {
        console.error('Error creating application:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    case 'GET': {
      // Retrieve all applications (for Owner)
      try {
        const apps = await Application.find({});
        return res.status(200).json(apps);
      } catch (error) {
        console.error('Error fetching applications:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    case 'PATCH': {
      // Owner updates an application (approve, decline, add comment)
      try {
        const { appId, status, ownerComment } = req.body;
        if (!appId || !status) {
          return res
            .status(400)
            .json({ error: 'Missing appId or status in request body' });
        }

        const updatedApp = await Application.findByIdAndUpdate(
          appId,
          { status, ownerComment: ownerComment || '' },
          { new: true }
        );

        if (!updatedApp) {
          return res.status(404).json({ error: 'Application not found' });
        }

        return res
          .status(200)
          .json({ message: 'Application updated', updatedApp });
      } catch (error) {
        console.error('Error updating application:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    case 'DELETE': {
      // Owner deletes an application
      try {
        const { id } = req.query;
        if (!id) {
          return res
            .status(400)
            .json({ error: 'Missing application ID in query' });
        }
        const deleted = await Application.findByIdAndDelete(id);
        if (!deleted) {
          return res.status(404).json({ error: 'Application not found' });
        }
        return res.status(200).json({ message: 'Application deleted' });
      } catch (error) {
        console.error('Error deleting application:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    default:
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}
