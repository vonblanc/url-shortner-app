//
// // let fileStorageRewired= rewire("./FileStorage.js");
//
// test('Should write to storage', async ()=>{
//
//   jest.mock('./FileStorage.js', () => ({
//     ...jest.requireActual('./FileStorage.js'),
//     fetchStorage: jest.fn(),
//     write:jest.fn(),
//   }));
//
//   let fileStorage= require('./FileStorage.js')
//
//
//   expect.assertions(1);
//
//   let mockedStorage = {};
//
//   // const fetchStorage = jest.spyOn(FileStorage, 'fetchStorage');
//   // const write = jest.spyOn(FileStorage, 'write');
//
//   fileStorage.fetchStorage.mockResolvedValue(mockedStorage);
//   fileStorage.write.mockResolvedValue(null);
//
//   const dataToWrite = {shortUrl: 'https://blah', longUrl: 'https://google.com'};
//   try {
//     const result = await fileStorage.writeToStorage(dataToWrite);
//     expect(fileStorage.write).toHaveBeenCalled();
//     expect(fileStorage.fetchStorage).toHaveBeenCalled();
//     expect(fileStorage.write.mock.calls[0][0]).toBe(dataToWrite);
//     expect(result).toBeNull();
//   }
//   catch (err){
//     console.log(err);
//   }
// })