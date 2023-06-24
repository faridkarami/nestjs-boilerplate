import { FileEntity } from './entities/file.entity';

export const filesUtility = {
  getPath: (fileEntity: FileEntity) => {
    return fileEntity ? fileEntity.path : null;
  },
};
