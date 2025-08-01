import { DeleteAccount } from '../settings-sidebar';
import { BasicSettings, Password, FilesUpload } from './components';

export function AccountSettingsPlainContent() {
  return (
    <div className="grid gap-5 lg:gap-7.5 xl:w-[38.75rem] mx-auto">
      <BasicSettings title="General Settings" />
      <FilesUpload />
      <Password />
      <DeleteAccount />
    </div>
  );
}
