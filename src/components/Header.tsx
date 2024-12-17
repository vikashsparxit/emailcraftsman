import { UserNav } from './UserNav';

interface HeaderProps {
  onOpenTemplate: (html: string) => void;
}

const Header = ({ onOpenTemplate }: HeaderProps) => {
  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Email Crafter</h1>
        <UserNav onOpenTemplate={onOpenTemplate} />
      </div>
    </header>
  );
};

export default Header;