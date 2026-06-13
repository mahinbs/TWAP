
import Button from '../base/Button';

export default function CTASection() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Showcase Your AI Tool?
        </h2>
        <p className="text-xl text-orange-100 mb-8">
          Get your AI application featured in our directory and reach thousands of potential users
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" className="bg-white text-orange-600 border-white hover:bg-orange-50">
            Submit Your App
          </Button>
          <Button variant="primary" size="lg" className="bg-blue-600 hover:bg-blue-700">
            Learn More
          </Button>
        </div>
        
        <div className="mt-8 text-orange-100">
          <p className="text-sm">
            ✓ Free listing for qualifying apps  ✓ Detailed analytics  ✓ User feedback system
          </p>
        </div>
      </div>
    </div>
  );
}
