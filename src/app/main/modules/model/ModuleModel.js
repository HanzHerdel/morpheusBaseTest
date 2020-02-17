import {FuseUtils} from '@fuse';

function ModuleModel(data)
{
    const item = data ? data : {};
    return {
        id         : item.id || FuseUtils.generateGUID(),
        nameModule : item.name || '',
        description: item.description || ''

    }
}

export default ModuleModel;
