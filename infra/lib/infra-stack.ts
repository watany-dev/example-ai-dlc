import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * インフラスタックのプレースホルダ。
 * front 配信・back API・監視リソースは spec の design.md 確定後に追加する。
 */
export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
  }
}
