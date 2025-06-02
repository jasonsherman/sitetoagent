import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} SiteToAgent. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;