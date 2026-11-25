import { Test, TestingModule} from '@nestjs/testing';
import { EpisodesController } from './episodes.controller.js';
import { EpisodesService } from './episodes.service.js';
import { ConfigModule } from '../config/config.module.js';

//describe function provided by Vitest to group related tests together
describe('EpisodeController', () => {

  let controller: EpisodesController;
  // mocking the findOne method of the EpisodesService class
  const mockFindOne = vi.fn(); 

  // mocking service object 
  const mockEpisodesService = {
    findAll: async () => [{id:'id'}],
    findFeaturedEpisodes:async () => [{id:'id'}],
    findOne: mockFindOne,
    create: async (input:any) => ({id:'id', ...input})
  }

  beforeEach(async ()=> {
    
    vi.resetAllMocks(); // working with mocks is a good idea to reset all mocks before each test to ensure that tests are isolated and do not interfere with each other.
    // creating environment for testing the controller
    const module: TestingModule = await Test.createTestingModule({
      // Test builder doesn't know how to inject the controller service and the configService defined in the controller service
      imports:[ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService , useValue: mockEpisodesService }],
    }).compile();
    controller = module.get<EpisodesController>(EpisodesController);
  } )
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when episode is found', async() => {
         // calling the findOne method of the controller with a specific episode ID and storing the result in mockresult
      const episodeId = 'id';
      const mockresult = { id:episodeId, name: 'my episode' };
      //before each test to ensure that the controller calls the service method with correct values 
      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockresult);
      })

      it('should call the service with correct params',async()=> {
        await controller.findOne(episodeId); 
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      }); 
      it('should return the correct episode',async()=> {
        const result = await controller.findOne(episodeId);
        expect(result).toEqual(mockresult);
      }); 
    })
   describe('when episode is not found', () => {
    const episodeId = 'id2'; 

    beforeEach(()=> {
      mockFindOne.mockResolvedValue(null);
    })

    it('should throw an error', async () => {
      await expect(controller.findOne(episodeId)).rejects.toThrowError();
    })
}) 

})
})
//You're creating a JavaScript object called mockEpisodesService.
// Notice that this is not an instance of your actual EpisodesService class.
// It's simply an object containing methods that imitate the real service.
// Why?
// Because when testing the controller, you don't necessarily want to execute the actual business logic.
// You want to control what the service returns. 

