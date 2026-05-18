import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { InfraStack } from '../lib/infra-stack';

describe('InfraStack', () => {
  it('synthesizes successfully at the harness stage', () => {
    const app = new App();
    const stack = new InfraStack(app, 'TestStack');
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toBeDefined();
  });
});
