/**
 * @createdBy Kamal
 * @createdOn 05th May 2020
 */

export const noteModel: any = {};

// create note
noteModel.createNote = (data: any, noteCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await noteCollection.insertOne(data);
      resolve(res);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// update note
noteModel.updateNote = (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// delete note
noteModel.deleteNote = (data: any, noteCollection: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('delete note');
      const deleteItem = noteCollection.deleteMany(data);
      resolve(deleteItem);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};