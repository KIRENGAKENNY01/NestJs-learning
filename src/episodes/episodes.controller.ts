import { Controller, Get, Param, Post, Query, Body, HttpStatus, HttpException, ParseIntPipe, DefaultValuePipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { EpisodesService } from './episodes.service.js';
import { CreateEpisodeDto } from './dto/create-episode.dto/create-episode.dto.js';
import { ConfigService } from '../config/config.service.js';    
import { IsPositivePipePipe } from './pipes/is-positive-pipe/is-positive-pipe.pipe.js';
import { ApiKeyGuardGuard } from './guards/api-key-guard/api-key-guard.guard.js';

@UseGuards(ApiKeyGuardGuard)
@Controller('episodes')
export class EpisodesController {
      // use constructor to inject the EpisodesService and ConfigService into the controller -> depedency injection 
    constructor(
        private episodesService:EpisodesService,
        private configService:ConfigService
    ) {}
    @Get()
    findAll(
        //@Query decorator is used to extract the query parameters from the request URL.
        //  The sort parameter is extracted from the query string and has a default value of 'desc' if not provided.
        //  The limit parameter is also extracted from the query string, and it has a default value of 100.
        //The DefaultValuePipe is used to provide a default value for the limit parameter if it is not present in the query string.
        //The ParseIntPipe is used to convert the limit parameter from a string to an integer.
        //The IsPositivePipePipe is a custom pipe that checks if the limit parameter is a positive number.
        @Query('sort') sort: 'asc' | 'desc' = 'desc',
        @Query('limit',new DefaultValuePipe(100),ParseIntPipe, IsPositivePipePipe) limit: number ,
    ) {
        console.log(sort)   
        return this.episodesService.findAll(sort);
    }

    @Get('featured')
    findFeatured() {
        return this.episodesService.findFeatured();
    }
    
    @Get(':id')
     async findOne(@Param('id') id:string){
        console.log(id);
        const episode = await this.episodesService.findOne(id);
        if(!episode) {
            throw new HttpException(`Episode not found`,HttpStatus.NOT_FOUND);
        }
        return episode; 
    }

    @Post()
    create(@Body(ValidationPipe) input:CreateEpisodeDto) {
        console.log(input);
        return this.episodesService.create(input);
    }

}
