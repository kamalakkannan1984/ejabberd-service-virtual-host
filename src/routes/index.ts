/**
 * @createdBy kamal
 * @createdOn 05th Mar 2020
 */

import { healthSchema } from '../schema/health.schema';
import { healthHandlers } from '../handlers/health.handler';
import { ejabberdConfigHandlers } from '../handlers/ejabbredConfig.handler';
import { ejabbredConfigSchema } from '../schema/ejabbredConfig.schema';

const AUTH = 'validateSession';

/**
 * @param {Object} fastify - fastify
 */
export const configureRoutes = (fastify: any, options: any, done: any) => {
  fastify.get(
    '/api/status',
    {
      //preValidation: [fastify.validateSession],
      schema: {
        description: 'Status api',
        tags: ['health'],
        response: healthSchema.statusRes,
      },
    },
    healthHandlers.getStatus,
  );

  //end Call histroy routes
  fastify.post(
    '/api/vhost',
    {
      //preValidation: [fastify.validateSession],
      schema: {
        description: ' Virtual host add Api',
        tags: ['host'],
        body: ejabbredConfigSchema.addVhost.body,
        // response: userSchema.createTeamRes
      },
    },
    ejabberdConfigHandlers.addVhost,
  );

  fastify.delete(
    '/api/vhost/:vhost',
    {
      //preValidation: [fastify.validateSession],
      schema: {
        description: 'Virtual host delete Api',
        tags: ['host'],
        params: ejabbredConfigSchema.deleteVhost.params,
        // response: userSchema.createTeamRes
      },
    },
    ejabberdConfigHandlers.deleteVhost,
  );

  fastify.put(
    '/api/vhost/:vhost',
    {
      // preValidation: [fastify.validateSession],
      schema: {
        description: 'Virtual host update Api',
        tags: ['host'],
        params: ejabbredConfigSchema.updateVhost.params,
        body: ejabbredConfigSchema.updateVhost.body,
        // response: userSchema.createTeamRes
      },
    },
    ejabberdConfigHandlers.updateVhost,
  );

  fastify.get(
    '/api/vhost',
    {
      // preValidation: [fastify.validateSession],
      schema: {
        description: 'Virtual host update Api',
        tags: ['host'],
        //params: ejabbredConfigSchema.updateVhost.params,
        //body: ejabbredConfigSchema.updateVhost.body,
        response: ejabbredConfigSchema.getRes,
      },
    },
    ejabberdConfigHandlers.getVhost,
  );

  done();
};
