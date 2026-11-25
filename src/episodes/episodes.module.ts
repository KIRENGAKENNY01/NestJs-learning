import { Module } from '@nestjs/common';
import {ConfigModule} from '../config/config.module.js';
import { EpisodesController } from './episodes.controller.js';
import { EpisodesService } from './episodes.service.js';

@Module({
  imports: [ConfigModule],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
