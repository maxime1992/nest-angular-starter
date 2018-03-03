import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [FeaturesModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {}
